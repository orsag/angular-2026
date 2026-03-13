import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  signal,
  effect,
} from '@angular/core';
import { InfiniteCommentService } from '../Services/infinite-comment-service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-infinite-scroll',
  imports: [CommonModule, FormsModule],
  templateUrl: './infinite-scroll.html',
  styleUrl: './infinite-scroll.scss',
})
export class InfiniteScroll implements OnDestroy {
  // private platformId = inject(PLATFORM_ID);
  searchBar = signal('');
  service = inject(InfiniteCommentService);

  private restoringScroll = true;
  private observer?: IntersectionObserver;
  filteredComments$ = this.service.filteredComments$;

  @ViewChild('anchor') anchor!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor() {
    effect(() => {
      const term = this.searchBar();
      this.service.updateSearch(term);
    });

    afterNextRender(() => {
      if (this.observer) {
        return;
      }
      this.initObserver();
      // This logic ONLY runs in the browser, after the initial render
      if (this.service.savedScrollPosition > 0) {
        // 1. Wait for the FIRST emission of data from the service
        this.service.filteredComments$.pipe(take(1)).subscribe(() => {
          // 2. Give the @for loop one "macro-task" to finish rendering the HTML
          setTimeout(() => {
            if (this.scrollContainer) {
              this.scrollContainer.nativeElement.scrollTo({
                top: this.service.savedScrollPosition,
                behavior: 'instant',
              });
              this.restoringScroll = false;
            }
          }, 100);
        });
      } else {
        this.restoringScroll = false;
      }
    });
  }

  private initObserver() {
    const rootEl = this.scrollContainer.nativeElement;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (this.restoringScroll) {
          return; // Ignore the first intersection event
        }
        // If the anchor div is visible and we aren't already loading...
        if (entry.isIntersecting && !this.service.loading$.value) {
          this.service.loadNextPage();
        }
      },
      { threshold: 0.1, root: rootEl },
    );

    this.observer.observe(this.anchor.nativeElement);
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    // Save it as they scroll, so it's always up to date
    this.service.savedScrollPosition = target.scrollTop;
  }

  ngOnDestroy() {
    // Manually stop watching and clear the observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined; // Clear the reference entirely
    }
  }

  clearSearch() {
    this.searchBar.set('');
    this.service.updateSearch('');
  }
}
