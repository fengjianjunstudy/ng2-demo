/**
 * Created by feifei on 2016/8/20.
 */
import { Routes , RouterModule } from '@angular/router';

import { PieComponent } from './pie.component'
const pieRoutes:Routes =<Routes>[
    {
        path: 'pie',
        component:PieComponent
    }
]
export const routing = RouterModule.forChild(pieRoutes);