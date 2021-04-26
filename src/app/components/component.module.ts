import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesService } from "../services/utilities/utilities.service";

/**
 * Importar este módulo para hacer uso de los componentes en cualquier página
 * Para que el componente sea usable debe Importarse y Exportarse
 * NO IMPORTAR NI EXPORTAR COMPONENTES CREADOS PARA USARSE EN UNA SOLA PAGINA
 */
@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
  ],

  declarations: [],

  exports: [HttpClientModule, ReactiveFormsModule],

  entryComponents: [],

  providers: [UtilitiesService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
