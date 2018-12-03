import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent {
  title = 'posts';
  posts: Post[];
  constructor(private postService: PostService) { }
  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }
}
