import { Component } from '@angular/core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import { injectRender } from './renderer/injectRender'
import { RouteMatch } from './Match'
import { injectSsrScrollRestorationScript } from './ssr-scroll-restoration'
import { injectTransitionerSetup } from './transitioner'

@Component({
  selector: 'router-matches',
  template: '',
  standalone: true,
})
export class Matches {
  router = injectRouter()

  private matchId = injectStore(this.router.stores.firstMatchId, (id) => id)

  private ssrScrollRestoration = injectSsrScrollRestorationScript()

  transitioner = injectTransitionerSetup()

  render = injectRender(() => {
    const matchId = this.matchId()

    if (!matchId) {
      return null
    }

    return {
      component: RouteMatch,
      inputs: {
        matchId: () => matchId,
      },
    }
  })
}
