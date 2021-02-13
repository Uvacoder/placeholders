import { Component, Element, Host, Prop, State, h } from '@stencil/core';

import random from '../helpers/random';

@Component({
    tag: 'placeholder-lines',
    shadow: false,
})
export class PlaceholderLines {
    @Element() private element: HTMLElement;
    @Prop() size: number;
    @State() width: number = 300;

    private ITEM_HEIGHT = 8;
    private ITEM_SPACING = 8;

    componentDidLoad() {
        const rect = this.element.getBoundingClientRect();
        this.width = rect.width;
    }

    render() {
        const height = this.size * this.ITEM_HEIGHT  + (this.size - 1) * this.ITEM_SPACING;

        return (
            <Host style={{ display: 'block', width: '100%' }}>
                <svg viewBox={`0 0 ${this.width} ${height}`} height={height}>
                {
                    Array(this.size).fill(0).map((_, i) => (
                        <rect
                            height={this.ITEM_HEIGHT}
                            width={`${random(3, 10) * 10}%`}
                            x={0}
                            y={i * (this.ITEM_HEIGHT + this.ITEM_SPACING)}
                            rx={2}
                            ry={2}
                            fill='currentColor'
                        />
                    ))
                }
                </svg>
            </Host>
        );
    }
}
