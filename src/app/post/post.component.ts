import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent {
  post: Post;

  constructor(
    private title: Title,
    private meta: Meta,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
  }
  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.meta.updateTag({ name: 'og_title', content: post.text_title })
        this.meta.updateTag({ name: 'og_url', content: post.fb_og_url })
        this.meta.updateTag({ name: 'og_type', content: post.fb_og_type })
        this.meta.updateTag({ name: 'og_description', content: post.fb_og_description })
        this.meta.updateTag({ name: 'og_image', content: post.fb_og_image })
      });
  }
}
