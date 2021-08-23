import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { AttributesComponent } from './attributes/attributes.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {
  DialogboxComponent,
  DialogOverviewExampleDialog,
} from './dialogbox/dialogbox.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from './layouts/table/table.component';
import { MatInputModule } from '@angular/material/input';
import { CostcenterComponent } from './costcenter/costcenter.component';
import { TabComponent } from './layouts/tabs/tab/tab.component';
import { JentryComponent } from './jentry/jentry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsComponent } from './forms/forms.component';
import { TabComponent } from './layouts/tab/tab.component';
import { ReusableTableComponent } from './layouts/reusable-table/reusable-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    DashComponent,
    AttributesComponent,
    RegisterComponent,
    FooterComponent,
    AccountsComponent,
    DialogboxComponent,
    DialogOverviewExampleDialog,
    TableComponent,
    CostcenterComponent,
    TabComponent,
    FormsComponent,
    JentryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    NgbModule,
    MatSelectModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
