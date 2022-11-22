import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EditCharacterComponent } from './pages/edit-character/edit-character.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CharacterInfoComponent } from './pages/character-info/character-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthUserGuard } from './guards/auth-user.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "characters", component: CharactersComponent},
  {path: "characters/:id", component: CharacterInfoComponent},
  {path: "characters/edit/:id", component: EditCharacterComponent, canActivate: [AuthUserGuard]},
  {path: "admin", component: AdminComponent, canActivate: [AuthUserGuard]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
