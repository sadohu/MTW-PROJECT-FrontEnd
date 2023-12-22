import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = true;
  nombreUsuario = "";

  // constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    // if (this.tokenService.getToken()) {
    //   this.isLogged = true;
    //   this.nombreUsuario = this.tokenService.getUserNameComplete() || '{}';
    // } else {
    //   this.isLogged = false;
    //   this.nombreUsuario = '';
    // }
  }

}
