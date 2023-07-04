import { Component, OnInit } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { centros } from '../models/centros';
import { Formulario } from './form-data.interface';
import { Personal, personal } from '../models/personal';
import {
  controlarFormulario,
  validaciones,
  validezFormulario,
  getValues,
} from './form-validación';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
})
export class Form2Component implements OnInit {
  form: Formulario;

  currentYear!: number;

  sumaPuntaje: number = 0;
  desempeno!: number;
  multiPuntajeyDias!: number;
  antiguedad!: number;
  academico!: number;
  periodo!: string;
  resultt!: string;
  rfc!: string;
  nombre!: string;
  registros!: any[];
  modal: Boolean = false;

  centros = [...centros];

  // Obtener la fecha actual del sistema
  fechaActual = new Date();
  // Obtener solo el dia, mes y año
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1;
  anio = this.fechaActual.getFullYear();
  // Asignarlo a la variable fechaFormateada
  fechaFormateada = `${this.dia.toString().padStart(2, '0')}/${this.mes
    .toString()
    .padStart(2, '0')}/${this.anio}`;
 

  constructor(private toastr: ToastrService) {
    // Obtiene el año actual del sistema
    this.currentYear = new Date().getFullYear();
    // Concatena los meses del periodo con el año actual -1
    this.periodo = 'Enero-Diciembre ' + (this.currentYear - 1);
    // Recupera los datos del LocalStorage al inicializar el componente
    const storedData = localStorage.getItem('registros');
    // Si hay datos almacenados, conviértelos de nuevo a un objeto o matriz JSON
    this.registros = storedData ? JSON.parse(storedData) : [];

  

    this.form = {
      etapa: '',
      tt: 0,
      observaciones: '',
      nombrepersonal: '',
      seccionsindical: 0,
      tipoCentro: '',
      rfc: '',
      inicioperiodo: '',
      finperiodo: '',
      centrotrabajo: '',
      evaluador: '',
      periodoevaluado: '',
      municipio: 'Irapuato',
      funcion: '',
      clavecentro: '',
      telefonocentro: '',
      dias: 365,
      cursos: 0,
      observasiones: '',

      puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  autocompletarNombre() {
    const rfc = this.form.rfc;

    // Buscar el personal en la lista a partir del RFC ingresado
    const personalEncontrado = personal.find((p: Personal) => p.RFC === rfc);

    if (personalEncontrado) {
      this.form.nombrepersonal = personalEncontrado.Nombre;
    } else {
      this.form.nombrepersonal = '';
    }
  }

  //clave de centro codigo
  onClaveCentroChange() {
    const selectedClave = this.form.clavecentro;
    const selectedCentro = this.centros.find(
      (centro) => centro.clave_de_centro === selectedClave
    );
    if (selectedCentro) {
      this.form.centrotrabajo = selectedCentro.centro_de_trabajo;
    } else {
      this.form.centrotrabajo = '';
    }
  }

  /// Dar formato al teléfono
  formatoTelefono(): void {
    const telefono = document.getElementById('telefono');
    const telefonoElement = telefono as HTMLInputElement;

    telefonoElement.addEventListener('keyup', (e) => {
      let telefonoVal = telefonoElement.value.trim();

      telefonoElement.value = telefonoVal
        .replace(/\W/gi, '')
        .replace(/(.{3})(.{3})/, '$1 $2')
        .replace(/(.{4})$/, ' $1')
        .replace(/\s$/, '');

      console.log(telefonoVal);
    });
  }

  ngOnInit() {
    controlarFormulario();
  }

  evaluar(): void {
    getValues();
    this.modal = validezFormulario.every((val) => val);
    console.log(this.modal);
    console.log(validezFormulario);
  }

  comprobar(): void {
    validaciones();
    const validez = validezFormulario.every((val) => val);
    const valueWrong: number[] = [];

    for (let i = 0; i < validezFormulario.length; i++) {
      if (validezFormulario[i] === false) {
        valueWrong.push(i);
      }
    }

    for (let i = valueWrong.length; i >= 0; i--) {
      switch (valueWrong[i]) {
        case 0:
          this.toastr.error(
            'El campo RFC con homoclave de la convocatoria no ha sido llenado',
            'RFC con homoclave',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 1:
          this.toastr.error(
            'El campo nombre del personal no ha sido llenado',
            'Nombre del personal',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 2:
          this.toastr.error(
            'El campo sección sindical no ha sido llenado',
            'Sección sindical',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 3:
          this.toastr.error('El campo función no ha sido llenado', 'Función', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          break;
        case 4:
          this.toastr.error(
            'El campo clave de centro de trabajo no ha sido llenado',
            'Clave de centro de trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 5:
          this.toastr.error('El campo tipo de centro de trabajo no ha sido llenado', 'Tipo de centro de trabajo', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          break;
        case 6:
          this.toastr.error(
            'El campo teléfono de su centro de trabajo no ha sido llenado',
            'Teléfono de su centro de trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 7:
          this.toastr.error(
            'El campo nombre del evaluador no ha sido llenado',
            'Nombre del evaluador',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 8:
          this.toastr.error(
            'El campo días laborados no ha sido llenado',
            'Días laborados',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 9:
          this.toastr.error(
            'El campo de la tabla con la competencia logros de resultados no ha sido llenado',
            'Logros de resultados',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 10:
          this.toastr.error(
            'El campo de la tabla con la competencia iniciativa no ha sido llenado',
            'Iniciativa',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 11:
          this.toastr.error(
            'El campo de la tabla con la competencia relaciones interpersonales no ha sido llenado',
            'Relaciones Interpersonales',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 12:
          this.toastr.error(
            'El campo de la tabla con la competencia actitud de servicio no ha sido llenado',
            'Actitud de Servicio',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 13:
          this.toastr.error(
            'El campo de la tabla con la competencia trabajo en equipo no ha sido llenado',
            'Trabajo en equipo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 14:
          this.toastr.error(
            'El campo de la tabla con la competencia disponibilidad no ha sido llenado',
            'Disponibilidad',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 15:
          this.toastr.error(
            'El campo de la tabla con la competencia uso de recursos no ha sido llenado',
            'Uso de recursos',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 16:
          this.toastr.error(
            'El campo de la tabla con la competencia administración del tiempo no ha sido llenado',
            'Administración del tiempo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 17:
          this.toastr.error(
            'El campo de la tabla con la competencia conocimiento del trabajo no ha sido llenado',
            'Conocimiento del trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 18:
          this.toastr.error(
            'El campo de la tabla con la competencia comunicación no ha sido llenado',
            'Comunicación',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 19:
          this.toastr.error(
            'El campo años de antigüedad no ha sido llenado',
            'Años de antigüedad',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 20:
          this.toastr.error(
            'El campo grado educativo no ha sido llenado',
            'Grado educativo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 21:
          this.toastr.error('El campo cursos no ha sido llenado', 'Cursos', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          break;
        default:
          console.log('Error switch default');
          break;
      }
    }

    switch (valueWrong[0]) {
      case 0:
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 1:
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 2:
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 3:
        window.scrollTo({ top: 100, behavior: 'smooth' });
        break;
      case 4:
        window.scrollTo({ top: 100, behavior: 'smooth' });
        break;
      case 5:
        window.scrollTo({ top: 100, behavior: 'smooth' });
        break;
      case 6:
        window.scrollTo({ top: 250, behavior: 'smooth' });
        break;
      case 7:
        window.scrollTo({ top: 350, behavior: 'smooth' });
        break;
      case 8:
        window.scrollTo({ top: 750, behavior: 'smooth' });
        break;
      case 9:
        window.scrollTo({ top: 1150, behavior: 'smooth' });
        break;
      case 10:
        window.scrollTo({ top: 1150, behavior: 'smooth' });
        break;
      case 11:
        window.scrollTo({ top: 1150, behavior: 'smooth' });
        break;
      case 12:
        window.scrollTo({ top: 1150, behavior: 'smooth' });
        break;
      case 13:
        window.scrollTo({ top: 1250, behavior: 'smooth' });
        break;
      case 14:
        window.scrollTo({ top: 1250, behavior: 'smooth' });
        break;
      case 15:
        window.scrollTo({ top: 1450, behavior: 'smooth' });
        break;
      case 16:
        window.scrollTo({ top: 1450, behavior: 'smooth' });
        break;
      case 17:
        window.scrollTo({ top: 1550, behavior: 'smooth' });
        break;
      case 18:
        window.scrollTo({ top: 1550, behavior: 'smooth' });
        break;
      case 19:
        window.scrollTo({ top: 2250, behavior: 'smooth' });
        break;
      case 20:
        window.scrollTo({ top: 2350, behavior: 'smooth' });
        break;
      case 21:
        window.scrollTo({ top: 2450, behavior: 'smooth' });
        break;
      default:
        console.log('Error switch default');
        break;
    }
    this.calcularSumaPuntajes();
    this.sumarTodo();

    if (validez) {
      // this.generatePDF();
    }

    console.log(validez);
    this.modal = validez;
  }

  enviarDatos() {
    // Obtén los valores de los campos
    const nuevoRegistro = {
      nombre: this.form.nombrepersonal,
      puntaje: this.resultt,
    };

    if (this.registros.length <= 37) {
      // Agrega el nuevo dato a la variable datos
      this.registros.push(nuevoRegistro);
      console.log("llevas " + this.registros.length + " registros")

      // Guarda los datos actualizados en el LocalStorage
      localStorage.setItem('registros', JSON.stringify(this.registros));
      console.log('DATO AGREGADO');
      this.generatePDF();
    }else{
      console.log("NO SE PUEDEN AGREGAR NUEVOS REGISTROS");
    }
  }

  eliminarRegistro(registro: any): void {
    const index = this.registros.indexOf(registro); // Obtener el índice del registro a eliminar
    if (index !== -1) {
      this.registros.splice(index, 1); // Eliminar el registro del arreglo

      const data = JSON.stringify(this.registros); // Convertir el arreglo actualizado a una cadena JSON
      localStorage.setItem('data', data); // Guardar los datos actualizados en el localStorage
    }
  }

  calcularSumaPuntajes(): void {
    this.sumaPuntaje = this.form.puntajeComp.reduce((a, b) => a + Number(b), 0);
    this.desempeno = this.sumaPuntaje / 365;
   this.multiPuntajeyDias = Math.floor(this.desempeno * this.form.dias * 100) / 100;
  }

  sumarTodo(): void {
    this.form.tt =
    this.multiPuntajeyDias +
      Number(this.antiguedad) +
      Number(this.academico) +
      Number(this.form.cursos);
    this.resultt = this.form.tt.toFixed(2);
  }

findKey(): void {
  this.centros.forEach((data) => {
    if (data.centro_de_trabajo === this.form.centrotrabajo) {
      this.form.clavecentro = data.clave_de_centro;
    }
  });
}


  async generatePDF(): Promise<void> {
    const existingPdfBytes = await fetch(
      '../../assets/formats/4factores.pdf'
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Realiza las modificaciones en el documento pdfDoc, como agregar texto, imágenes, etc.

    const page1 = pdfDoc.getPage(0);
    const page2 = pdfDoc.getPage(1);

    // Obtener la fuente estándar Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaFontBold = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    page1.drawText(`${this.currentYear}`, {
      x: 357,
      y: page1.getHeight() - 92,
      size: 5,
      font: helveticaFontBold,
      color: rgb(0, 0, 0),
    });

    page1.drawText(`${this.form.etapa}`, {
      x: 190,
      y: page1.getHeight() - 110,
      size: 5,
      font: helveticaFontBold,
      color: rgb(0, 0, 0),
    });

    page1.drawText(`${this.form.nombrepersonal}`, {
      x: 98,
      y: page1.getHeight() - 133,
      size: 7,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    if (this.form.centrotrabajo.length >= 60) {
      page1.drawText(`${this.form.centrotrabajo}`, {
        x: 327,
        y: page1.getHeight() - 132.5,
        size: 4.5,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });
    } else {
      page1.drawText(`${this.form.centrotrabajo}`, {
        x: 327,
        y: page1.getHeight() - 132.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });
    }

    if (Number(this.form.seccionsindical) === 45) {
      // 45
      page1.drawText(`X`, {
        x: 113,
        y: page1.getHeight() - 150,
        size: 8,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });
    } else {
      // 13
      page1.drawText(`X`, {
        x: 187,
        y: page1.getHeight() - 150,
        size: 8,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });
    }

    page1.drawText(`${this.form.evaluador}`, {
      x: 306,
      y: page1.getHeight() - 150.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.rfc}`, {
      x: 96,
      y: page1.getHeight() - 168.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.periodo}`, {
      x: 292,
      y: page1.getHeight() - 168,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.municipio}`, {
      x: 64,
      y: page1.getHeight() - 185.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.fechaFormateada}`, {
      x: 260,
      y: page1.getHeight() - 185.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.funcion}`, {
      x: 60,
      y: page1.getHeight() - 201.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.telefonocentro}`, {
      x: 337,
      y: page1.getHeight() - 220.5,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.clavecentro}`, {
      x: 115,
      y: page1.getHeight() - 221.5,
      size: 7,
      font: helveticaFont,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[0]}`, {
      x: 495,
      y: page1.getHeight() - 475,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[1]}`, {
      x: 495,
      y: page1.getHeight() - 491,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[2]}`, {
      x: 495,
      y: page1.getHeight() - 509,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[3]}`, {
      x: 495,
      y: page1.getHeight() - 528,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[4]}`, {
      x: 495,
      y: page1.getHeight() - 546,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[5]}`, {
      x: 495,
      y: page1.getHeight() - 561,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[6]}`, {
      x: 495,
      y: page1.getHeight() - 577,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[7]}`, {
      x: 495,
      y: page1.getHeight() - 593,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[8]}`, {
      x: 495,
      y: page1.getHeight() - 609,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.form.puntajeComp[9]}`, {
      x: 495,
      y: page1.getHeight() - 631,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    page1.drawText(`${this.sumaPuntaje}`, {
      x: 495,
      y: page1.getHeight() - 652,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page1.drawText(`${this.desempeno}`, {
      x: 350,
      y: page1.getHeight() - 673,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page1.drawText(`${this.form.dias}`, {
      x: 380,
      y: page1.getHeight() - 703,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page1.drawText(`${this.multiPuntajeyDias}`, {
      x: 350,
      y: page1.getHeight() - 735,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page2.drawText(`${this.antiguedad}`, {
      x: 267,
      y: page1.getHeight() - 394,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page2.drawText(`${this.academico}`, {
      x: 433,
      y: page1.getHeight() - 356,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page2.drawText(`${this.form.cursos}`, {
      x: 462,
      y: page1.getHeight() - 417,
      size: 7,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page2.drawText(`${this.resultt}`, {
      x: 329,
      y: page1.getHeight() - 448.5,
      size: 9,
      font: helveticaFontBold,
      color: rgb(1, 0, 0),
    });

    page2.drawText(`${this.form.observaciones}`, {
      x: 119,
      y: page1.getHeight() - 560.5,
      size: 7,
      font: helveticaFontBold,
      color: rgb(0, 0, 0.5),
    });

    const modifiedPdfBytes = await pdfDoc.save();

    // Descargar el archivo modificado
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.form.nombrepersonal}` + 'FCAPS-3 ';
    link.click();
  }

  async generatePDF1(): Promise<void> {
    const existingPdfBytes = await fetch(
      '../../assets/formats/tabla.pdf'
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Realiza las modificaciones en el documento pdfDoc, como agregar texto, imágenes, etc.

    const page1 = pdfDoc.getPage(0);
    const page2 = pdfDoc.getPage(1);

    // Obtener la fuente estándar Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const nombres = [], puntajes = [];
    for (const registro of this.registros) {
      nombres.push(registro.nombre);
      puntajes.push(registro.puntaje);
    }

    let y = page1.getHeight() - 126;
    let x = 117;
    let size = 7;

    for (let i = 0; i < nombres.length; i++) {

      const nombre = nombres[i];

      if (nombre.length >= 30 && nombre.length < 34) {
        size = 6.5;
      } else if (nombre.length >= 34) {
        size = 6;
      }

      page2.drawText(nombre, {
        x,
        y,
        size,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      y -= + 14

      if (i === 18) {
        // Cambiar la posición de x y y cuando el índice sea 2 (tercer elemento)
        x = 310; // Cambiar el valor de x
        y = page1.getHeight() - 126; // Cambiar el valor de y
      }
      size = 7;
    }

    x = 265
    y = page1.getHeight() - 126;

    for (let i = 0; i < puntajes.length; i++) {

      const puntaje = puntajes[i];

      page2.drawText(puntaje, {
        x: x + 2,
        y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      y -= + 14

      if (i === 18) {
        // Cambiar la posición de x y y cuando el índice sea 2 (tercer elemento)
        x = 460; // Cambiar el valor de x
        y = page1.getHeight() - 126; // Cambiar el valor de y
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();

    // Descargar el archivo modificado
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registros';
    link.click();
  }

}
