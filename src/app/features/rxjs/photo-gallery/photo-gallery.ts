import { Component, inject } from '@angular/core';
import { ThumbnailService } from '@services/thumbnail-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  imports: [AsyncPipe],
  templateUrl: './photo-gallery.html',
  styleUrl: './photo-gallery.scss',
})
export class PhotoGallery {
  private thumbnailService = inject(ThumbnailService);

  // Multiple subscribers can use this without triggering multiple HTTP calls
  protected photos$ = this.thumbnailService.thumbnails$;
}
