import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { AppModule } from 'src/app/app.module';
import { LayoutsComponent } from './Layouts/layouts.component';
import { ChatComponent } from './Chat/Component/chat.component';
import { ProfilePersonalComponent } from './Cognito/Component/Profile/profile-personal.component';



@NgModule({
  declarations: [
    LayoutsComponent,
    ChatComponent,
    ProfilePersonalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class SharedModule { }
