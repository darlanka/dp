import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScreenshotViewer } from '@app/components/screenshot-viewer/screenshot-viewer';
import { PREVIEW_TIMEOUT_MS } from '@app/constants/preview.constants';
import { PreviewState, ProjectImage } from '@app/models';

/** Shows a screenshot first, and a live iframe only when the visitor asks for it. */
@Component({
    selector: 'app-live-preview',
    imports: [ScreenshotViewer],
    templateUrl: './live-preview.html',
    styleUrl: './live-preview.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePreview {
    readonly url = input.required<string>();
    readonly title = input.required<string>();
    readonly images = input.required<readonly ProjectImage[]>();

    private readonly sanitizer = inject(DomSanitizer);
    private timer: ReturnType<typeof setTimeout> | undefined;

    protected readonly PreviewState = PreviewState;
    protected readonly state = signal(PreviewState.Idle);

    // Angular blocks dynamic iframe URLs unless they are marked trusted.
    // The URL comes from our own backend, and we still refuse anything that is not https.
    protected readonly safeUrl = computed(() =>
        this.url().startsWith('https://') ? this.sanitizer.bypassSecurityTrustResourceUrl(this.url()) : null,
    );

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    }

    protected start() {
        this.state.set(PreviewState.Loading);
        this.timer = setTimeout(() => {
            if (this.state() === PreviewState.Loading) this.state.set(PreviewState.TimedOut);
        }, PREVIEW_TIMEOUT_MS);
    }

    protected onLoaded() {
        if (this.state() !== PreviewState.Loading) return;
        clearTimeout(this.timer);
        this.state.set(PreviewState.Live);
    }

    protected reset() {
        clearTimeout(this.timer);
        this.state.set(PreviewState.Idle);
    }
}