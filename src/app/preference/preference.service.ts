import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';

const ENDPOINT = 'http://localhost:3000/local/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private request: RequestService) { }

  create() {
    return this.request.post(`${ENDPOINT}`, {
      body: 'newdata'
    });
  }

  update(id) {
    return this.request.post(`${ENDPOINT}/${id}`, {
      body: 'test'
    });
  }

  remove(id) {
    return this.request.delete(`${ENDPOINT}/${id}`);
  }

  get(id) {
    return this.request.get(`${ENDPOINT}/${id}`);
  }
}
