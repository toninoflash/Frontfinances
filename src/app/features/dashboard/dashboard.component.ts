import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { Select } from 'primeng/select';

import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../enviroments/environment';
import { User } from '../../core/models/user';
const endpoint: any = environment.baseUrlSpring+"users";


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,Select,ButtonModule, RippleModule, FormsModule, RouterModule, IconFieldModule],
  providers: [UserService, BaseServiceService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userLogin: any;
  followers: any;
  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.userLogin = this.userService.user;
    this.getFollowedUsers()
    throw new Error('Method not implemented.');
  }
  searchQuery = '';
  selectedFilter = 'Todos';
  selectedSort = 'Más reciente';
  newPostsAvailable = false;

  filters = ['Todos', 'Amigos', 'Seguidos', 'Populares'];
  sortOptions = ['Más reciente', 'Más popular', 'Más comentado'];

  posts = [
    {
      id: 1,
      user: { id: 'u1', name: 'Ana Ruiz', avatar: 'https://i.pravatar.cc/100?img=1' },
      date: new Date(),
      text: '¡Hoy empecé un nuevo cuadro!',
      image: 'https://source.unsplash.com/random/600x400?art',
      likes: 34,
      comments: [
        { user: 'Luis', text: '¡Qué genial!' },
        { user: 'Marta', text: 'Muéstralo pronto 👏' },
      ],
      newComment: '',
      poll: {
        question: '¿Qué técnica prefieres?',
        options: ['Acrílico', 'Acuarela', 'Óleo'],
        selected: '',
      },
    },
    // más publicaciones...
  ];

  suggestedUsers = [
    { name: 'Carlos Gómez', avatar: 'https://i.pravatar.cc/100?img=2' },
    { name: 'Lucía Pérez', avatar: 'https://i.pravatar.cc/100?img=3' },
  ];

  events = [
    { id: 'e1', title: 'Exposición en Madrid', date: new Date(Date.now() + 86400000 * 3) },
    { id: 'e2', title: 'Live Painting IG', date: new Date(Date.now() + 86400000 * 5) },
  ];

  activityLogs = [
    { user: 'Sofía', action: 'subió una nueva obra', date: new Date() },
    { user: 'Miguel', action: 'comentó en tu publicación', date: new Date() },
  ];

  addComment(post: any) {
    if (post.newComment?.trim()) {
      post.comments.push({ user: 'Tú', text: post.newComment });
      post.newComment = '';
    }
  }

  submitVote(post: any) {
    if (post.poll.selected) {
      alert(`Has votado: ${post.poll.selected}`);
      post.poll.voted = true;
    }
  }

  loadNewPosts() {
    // Aquí podrías traer nuevas publicaciones desde tu backend
    this.newPostsAvailable = false;
  }

  getFollowedUsers() {

    this.baseService.postItem(`${endpoint}/followers`, this.userLogin.follower).subscribe((res: any) => {
      if (res) {
        this.followers = res;
       }
    }
    );
  }

}
