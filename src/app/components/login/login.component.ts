import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {};

  constructor(private userService: UserService, private router: Router) { }

  loginUser() {
    // Validation
    console.log(this.user);

    // Call service
    this.userService.loginUser(this.user).subscribe(
      (response) => {
        if (response.message) {
          SwalCustoms.nyanAlert(response.message);
          return;
        }

        localStorage.setItem("USER", JSON.stringify(response));
        this.router.navigate(["/company"]);
      }
    );
  }
}
