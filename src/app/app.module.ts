import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'; // Import withFetch

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './table/table.component';
import { ManagementComponent } from './components/management/management.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from './components/users.service';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TableComponent,
    ManagementComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule, // Include HttpClientModule here
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Specify position
      preventDuplicates: true, // Optional: to prevent duplicate toasts
    }),
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  providers: [
    UsersService,
    ToastrService,
    provideHttpClient(withFetch()),
    provideAnimationsAsync(), // Configure HttpClient to use fetch
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
