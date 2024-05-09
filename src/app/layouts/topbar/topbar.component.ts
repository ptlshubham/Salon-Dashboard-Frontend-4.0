import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../core/services/event.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { LAYOUT_MODE } from "../layouts.model";
import ls from 'localstorage-slim';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar Component
 */
export class TopbarComponent implements OnInit {

  mode: string | undefined;
  element: any;
  cookieValue: any;
  valueset: any;

  member: any;
  Roles: any;
  datetime: any;
  in_time: any;
  out_time: any;
  visit: any = '';
  loginTotalTime: number = 0;
  uid: any;
  vip: any;
  public registrationmodel: any = {};

  public userName = ls.get('UserName', { decrypt: true });
  constructor(
    private router: Router,
    private loginService: UserProfileService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private eventService: EventService,
    private adminService: AdminService,

  ) { }

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layoutMode!: string;

  ngOnInit(): void {
    this.userName = ls.get('UserName', { decrypt: true });
    this.in_time = ls.get('lastInTime', { decrypt: true });
    this.out_time = ls.get('lastInTime', { decrypt: true });
    this.Roles = ls.get('role', { decrypt: true });
    this.uid = ls.get('UserId', { decrypt: true });
    this.vip = ls.get('VIP', { decrypt: true });
    this.member = ls.get('member', { decrypt: true });

    this.layoutMode = LAYOUT_MODE;

    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');

  }

  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  getTimeDifference(intime: string): number {
    const currentTime = new Date();
    const intimeDate = new Date(intime);
    if (intimeDate < currentTime) {
      const timeDifference = currentTime.getTime() - intimeDate.getTime();
      const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
      this.loginTotalTime = timeDifferenceInMinutes;
      return timeDifferenceInMinutes;
    } else {
      console.error('Login time is in the future!');
      return NaN; // or handle it according to your requirements
    }
  }
  logout() {
    this.getTimeDifference(this.in_time);
    let data = {
      userid: this.uid,
      loginMinute: this.loginTotalTime
    };
    this.loginService.UpdateLogout(data).subscribe((res) => {
      ls.clear();
      this.router.navigate(['/account/login']);
    });
  }
}
