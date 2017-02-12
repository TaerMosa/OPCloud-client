import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappidComponent } from './rappid.component';
import { RappidMainComponent } from './rappid-main/rappid-main.component';
import { RappidToolbarComponent } from './rappid-toolbar/rappid-toolbar.component';
import { RappidStencilComponent } from './rappid-stencil/rappid-stencil.component';
import { RappidPaperComponent } from './rappid-paper/rappid-paper.component';
import { GraphService } from './services/graph.service';
import { RappidInspectorComponent } from './rappid-inspector/rappid-inspector.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RappidComponent,
    RappidMainComponent,
    RappidToolbarComponent,
    RappidStencilComponent,
    RappidPaperComponent,
    RappidInspectorComponent
  ],
  providers: [
    GraphService,
  ],
  exports: [
    RappidComponent,
    RappidToolbarComponent
  ]
})
export class RappidModule { }
