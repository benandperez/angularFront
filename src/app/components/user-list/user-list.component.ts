import {  Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GithubService } from 'src/app/Service/github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  items: any[] = [];
  itemsChar: any[] = [];
  searchText: string = ''; 
  filteredItems: any[] = this.items;
  showModal= false;
  messageModal = "Error"
  chart: any; // Variable para el gráfico
  constructor(
    private gService: GithubService,
    private router: Router
    ) {
  }
  ngOnInit() {
    this.initChart();
    this.list();
    
    }

    initChart() {
      this.chart = new Chart('followersChart', {
        type: 'bar',
        data: {
          labels: [], // Nombres de los usuarios
          datasets: [
            {
              label: 'Número de Seguidores',
              data: [], // Cantidad de seguidores
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

  list(username: string = 'YOUR_NAME') : void {
    this.gService.getUsers(username).subscribe((data: any) => {
      // Asigna los datos al arreglo items
      this.items = data;
      // Actualiza los datos del gráfico
      this.char(data);
        
    },
      (error: any) => {
        this.showModal = true
        this.messageModal = error
        console.error('Error al obtener usuarios', error);
      }
    );
  }
  navigateToUserProfile(item: any) {
    const params = {
      login: item.login,
      score: item.score
    };
    this.router.navigate(['/user-profile', params]);
  }
  searchUser() {
    if (this.searchText.length < 4) {
      alert('La búsqueda debe contener al menos 4 caracteres.');
    } else if (this.searchText.toLowerCase().includes('doublevpartners')) {
      alert('No se permite buscar "doublevpartners".');
    } else {
      this.gService.getUsers(this.searchText).subscribe(
        (data: any) => {
          this.items = data;
          this.char(data);
        },
        (error: any) => {
          this.showModal = true
          this.messageModal = error
          console.error('Error al obtener usuarios', error);
        }
      );
    }
  }

  char(dataItems: any) {
    this.gService.getTopUsersForChart(dataItems)
      .then((data: any) => {
        console.log(data);
        const users = data[0].users;
        const followers = data[0].followers;
  
        this.chart.data.labels = users;
        this.chart.data.datasets[0].data = followers;
        this.chart.update();
      })
      .catch((error: any) => {
        // Manejo de errores y muestra del modal
        this.showModal = true;
        this.messageModal = error;
        console.error('Error al obtener usuarios', error);
      });
  }
}
