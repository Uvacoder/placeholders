import { Component, Element, Host, Prop, State, h } from '@stencil/core';

import random from '../helpers/random';

interface DOMRectReadOnly {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}

declare global {    
    interface ResizeObserverCallback {
        (entries: ResizeObserverEntry[], observer: ResizeObserver): void
    }

    interface ResizeObserverEntry {
        readonly target: Element;
        readonly contentRect: DOMRectReadOnly;
    }

    interface ResizeObserver {
        observe(target: Element): void;
        unobserve(target: Element): void;
        disconnect(): void;
    }
}

declare var ResizeObserver: {
    prototype: ResizeObserver;
    new(callback: ResizeObserverCallback): ResizeObserver;
}

@Component({
    tag: 'placeholder-lines',
    shadow: false,
})
export class PlaceholderLines {
    @Element() private element: HTMLElement;
    @Prop() size: number;
    @State() width?: number;

    private ITEM_HEIGHT = 8;
    private ITEM_SPACING = 8;

    private resizeObserver!: ResizeObserver;

    componentWillLoad() {
        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const { width } = entry.contentRect;
                this.width = width;
            });
        });
        this.resizeObserver.observe(this.element);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
    }

    render() {
        const height = this.size * this.ITEM_HEIGHT  + (this.size - 1) * this.ITEM_SPACING;

        return (
            <Host style={{ display: 'block', width: '100%' }}>
                {
                    this.width && (
                        <svg viewBox={`0 0 ${this.width} ${height}`} height={height}>
                        {
                            Array(this.size).fill(0).map((_, i) => (
                                <rect
                                    height={this.ITEM_HEIGHT}
                                    width={`${random(20, 100)}%`}
                                    x={0}
                                    y={i * (this.ITEM_HEIGHT + this.ITEM_SPACING)}
                                    rx={4}
                                    ry={4}
                                    fill='currentColor'
                                />
                            ))
                        }
                        </svg>
                    )
                }
            </Host>
        );
    }
}
