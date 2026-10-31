import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ENDPOINTS } from '@app/constants/api.constants';
import { ContactMessage, Profile } from '@app/models';

@Injectable({ providedIn: 'root' })
export class PortfolioApi {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get<Profile>(API_ENDPOINTS.profile);
  }

  sendMessage(message: ContactMessage) {
    return this.http.post<void>(API_ENDPOINTS.contact, message);
  }
}
