import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MessageService }          from './services/message.service';
import { PostService }       from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'blog.post' }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService,PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
