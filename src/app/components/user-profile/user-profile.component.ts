import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/Service/github.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  login!: string;
  userData: any;
  username!: string | null;
  score!: number | null;

  constructor(private route: ActivatedRoute,private gService: GithubService) {
    this.route.params.subscribe(params => {
      this.username = params['login'];
      this.score = params['score'];
    });
  }

   ngOnInit() {
     this.route.params.subscribe(params => {
       this.login = params['login'];
       let newData: { login: string; }
       this.gService.getUsers(this.login).subscribe(
         (data: any) => {
           data.forEach((element: { login: string; }) => {
             if (element.login.toLowerCase() === this.login.toLowerCase()) {
               newData = element;
             }
           });
           this.userData = newData;
         },
         (error: any) => {
           console.error('Error al obtener el perfil del usuario', error);
         }
       );
     });
   }

}
