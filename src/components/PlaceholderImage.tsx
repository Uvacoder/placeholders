import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'placeholder-image',
  shadow: false,
})
export class PlaceholderImage {
  @Prop() backgroundColor?: string = 'rgba(0, 0, 0, .2)';
  @Prop() color?: string = 'rgba(0, 0, 0, .6)';
  @Prop() width: number;
  @Prop() height: number;
  @Prop() text?: string;

  calculateFontSize() {
    return Math.floor(Math.min(this.width, this.height) * 0.2);
  }

  render() {
    return (
      <svg viewBox={`0 0 ${this.width} ${this.height}`} width={this.width} height={this.height}>
        <rect
          fill={this.backgroundColor}
          height={this.height}
          width={this.width}
        />
        <text
          dominant-baseline='central'
          fill={this.color}
          font-family='sans-serif'
          font-size={this.calculateFontSize()}
          font-weight='bold'
          text-anchor='middle'
          x='50%'
          y='50%'
        >
          {this.text || `${this.width} x ${this.height}`}
        </text>
      </svg>
    );
  }
}
