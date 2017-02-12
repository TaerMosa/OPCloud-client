import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RappidModule } from './rappid/rappid.module';
import { HeaderComponent } from './header/header.component';
import { ModelStorageService } from './services/model-storage.service';
import { MaterialModule } from '@angular/material';
import { SaveModelDialogComponent } from './dialogs/save-model-dialog/save-model-dialog.component';
import { LoadModelDialogComponent } from './dialogs/load-model-dialog/load-model-dialog.component';
import { ChooseLinkDialogComponent } from './dialogs/choose-link-dialog/choose-link-dialog.component';
import {TestDialogComponent} from './dialogs/testdialog/testdialog';
import { OplWidgetComponent } from './opl-widget/opl-widget.component';
import {LinkValidationService} from './dialogs/choose-link-dialog/link-API.service'
// resizble import component
import {ResizableModule} from 'angular2-resizable';
import { DataTableModule } from 'angular-2-data-table';
import { DataTableDemo } from './dialogs/choose-link-dialog/data-table';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveModelDialogComponent,
    LoadModelDialogComponent,
    ChooseLinkDialogComponent,
    TestDialogComponent,
    OplWidgetComponent,
    DataTableDemo

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RappidModule,
    ResizableModule,
    DataTableModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [
    SaveModelDialogComponent,
    LoadModelDialogComponent,
    ChooseLinkDialogComponent,
    TestDialogComponent,

  ],
  providers: [ModelStorageService,LinkValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {


}

