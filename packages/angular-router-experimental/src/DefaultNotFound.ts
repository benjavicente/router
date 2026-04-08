import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'tanstack-angular-router-default-no-found',
  template: `<p>Not found</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents;' },
})
export class DefaultNotFoundComponent {}
