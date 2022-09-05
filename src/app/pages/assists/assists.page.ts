import { AttendanceService } from './../../services/attendance.service';
import { LstorageService } from './../../services/lstorage.service';
import { MateriasService } from './../../services/materias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assists',
  templateUrl: './assists.page.html',
  styleUrls: ['./assists.page.scss'],
})
export class AssistsPage implements OnInit {
  data: any[]=[];
  asistencias: any[]=[];
  id_estudiante: number = 0;

  constructor(
    private serStorage: LstorageService,
    private serMat: MateriasService,
    private serAtten: AttendanceService ) { }

  ngOnInit() {
    this.id_estudiante =  this.serStorage.get('user')?.id_estudiante;
    this.serMat.getSubjects(this.id_estudiante).subscribe(resp => {
      if(resp.status == true ){
        this.data = resp.data;
      }
    });
  }

  cargarData(event){
    let id = event.detail.value;
    this.asistencias = [];
    this.serAtten.getListAttendance(id, this.id_estudiante).subscribe(
      resp => {
        if(resp.status == true){
          this.asistencias = resp.data;
        }
      }
    );
  }

}
