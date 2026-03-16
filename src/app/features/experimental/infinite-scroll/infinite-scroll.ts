import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  signal,
  computed,
} from '@angular/core';
import {
  INFINITE_SCROLL_CONFIG,
  InfiniteScrollingService,
} from '@services/infinite-scroll-items-service';
import { CommonModule } from '@angular/common';
import { combineLatestWith, debounceTime, map, startWith, take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollConfig } from '@types';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-infinite-scroll',
  imports: [CommonModule, FormsModule],
  templateUrl: './infinite-scroll.html',
  styleUrl: './infinite-scroll.scss',
  providers: [
    {
      provide: INFINITE_SCROLL_CONFIG,
      useValue: {
        url: 'https://jsonplaceholder.typicode.com/comments',
        pageSize: 8,
      } as InfiniteScrollConfig,
    },
    InfiniteScrollingService,
  ],
})
export class InfiniteScroll implements OnDestroy {
  // private platformId = inject(PLATFORM_ID);
  service = inject(InfiniteScrollingService);
  allItems$: Observable<Comment[]> = this.service.allItems$;
  isSearching = computed(() => this.searchBar().trim().length > 0);
  searchBar = signal('');

  private restoringScroll = true;
  private observer?: IntersectionObserver;

  @ViewChild('anchor') anchor!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor() {
    afterNextRender(() => {
      if (this.observer) {
        return;
      }
      this.initObserver();
      // This logic ONLY runs in the browser, after the initial render
      if (this.service.savedScrollPosition > 0) {
        // 1. Wait for the FIRST emission of data from the service
        this.service.allItems$.pipe(take(1)).subscribe(() => {
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
        const canLoad = entry.isIntersecting && !this.service.loading$.value && !this.isSearching();
        if (canLoad) {
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
  }

  private search$ = toObservable(this.searchBar).pipe(
    debounceTime(250),
    startWith(''), // Important: combineLatest won't emit until all sources emit once
  );

  filteredComments$ = this.allItems$.pipe(
    combineLatestWith(this.search$),
    map(([items, term]) => {
      const lower = term.toLowerCase().trim();
      if (!lower) return items;

      return items.filter(
        (c: Comment) =>
          c.name.toLowerCase().includes(lower) ||
          c.email.toLowerCase().includes(lower) ||
          c.body.toLowerCase().includes(lower),
      );
    }),
  );
}
