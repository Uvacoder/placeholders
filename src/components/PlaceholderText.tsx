import { Component, Element, Host, Prop, State, h } from '@stencil/core';

interface Rect {
    top: number;
    left: number;
    height: number;
    width: number;
}

@Component({
    tag: 'placeholder-text',
    shadow: false,
})
export class PlaceholderText {
    @Element() private element: HTMLElement;

    @Prop() itemHeight?: number;

    @State() width: number;
    @State() height: number;
    @State() rects: Rect[] = [];

    componentWillLoad() {
        const rect = this.element.getBoundingClientRect();
        const textNode = this.element.lastChild;
        if (textNode.nodeName !== '#text') {
            return;
        }

        const content = this.element.textContent;

        const subTexts = content.split(' ')
            .reduce(
                (prev, curr, index) => prev.concat({
                    index: prev[prev.length - 1].index + (index === 0 ? 0 : prev[prev.length - 1].content.length + 1),
                    length: curr.length,
                    content: curr,
                }),
                [{
                    index: 0,
                    length: 0,
                    content: '',
                }]
            )
            .slice(1);
        const range = document.createRange();

        this.height = rect.height;
        this.width = rect.width;
        this.rects = subTexts.filter(item => item.length > 0).map(item => {
            range.setStart(textNode, item.index);
            range.setEnd(textNode, item.index + item.length);

            const textRect = range.getBoundingClientRect();

            return {
                top: textRect.top - rect.top,
                left: textRect.left - rect.left,
                height: this.itemHeight || textRect.height,
                width: textRect.width,
            };
        });

        textNode.remove();

        range.detach();
    }

    render() {
        return (
            <Host>
                <slot></slot>
                {
                this.rects.length > 0 && (
                    <svg viewBox={`0 0 ${this.width} ${this.height}`}>
                        {this.rects.map(rect => (
                            <rect
                                height={rect.height}
                                width={rect.width}
                                x={rect.left}
                                y={rect.top}
                                rx={4}
                                ry={4}
                                fill='currentColor'
                            />
                        ))}
                    </svg>
                ) 
                }
            </Host>
        );
    }
}
