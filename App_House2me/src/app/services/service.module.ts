import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { environment } from 'src/environments/environment';
// const config: SocketIoConfig = { url: environment.url, options: {} };
import {
          UsuarioService,
          LoginGuardGuard,
          SubirarhivoService,
          AdminGuardGuard
          } from './service.index';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // SocketIoModule.forRoot(config),
    HttpClientModule,
  ],
  providers: [
          UsuarioService,
          LoginGuardGuard,
          SubirarhivoService,
          AdminGuardGuard  ]
})
export class ServiceModule { }
