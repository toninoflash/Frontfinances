import { Component } from '@angular/core';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { User } from '../../../core/models/user';
import { environment } from '../../../../enviroments/environment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
const endpoint: any = environment.baseUrlSpring;

@Component({
  selector: 'app-see',
  imports: [CommonModule,RouterModule,     AvatarModule, ButtonModule, Divider,
  ],
  templateUrl: './see.component.html',
  styleUrl: './see.component.scss',
})
export class SeeComponent {
  artwork: any;
  arthist: any;
  userLogin: User | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private baseService: BaseServiceService
  ) {}

  ngOnInit() {
    this.userLogin = this.userService.user || null;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.baseService.getItems(endpoint+"artwork/"+id).subscribe((data:any) => {
        this.artwork = data;
        this.baseService.getItems(endpoint+"users/full/"+this.artwork.uid).subscribe((data:any) => {
          this.arthist = data;
        });
      });
    }
  }

  goToArtwork(artwork: any) {
    const url = `${endpoint}/artwork/${artwork.id}`;
    this.baseService.getItems(url).subscribe((res) => {});
  }
}
