import { Component, h } from '@stencil/core';

@Component({
  tag: 'placeholder-text',
  shadow: false,
})
export class PlaceholderText {
  render() {
    return <slot></slot>;
  }
}
