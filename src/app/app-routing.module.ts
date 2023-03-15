import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main/main.component'
import { GameComponent } from './game/game.component'
import { EndGameComponent } from './end-game/end-game.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    component: GameComponent,
    children: [
      {
        path: 'end-game',
        component: EndGameComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
