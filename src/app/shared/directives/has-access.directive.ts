import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[hasAccess]',
  standalone: true
})
export class HasAccessDirective {

  constructor(
    private readonly authService:AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,

  ) { }

  private readonly subscriptions$ = new Subscription();


  @Input('hasAccess') set hasAccess(code:string){
    this.checkAccess(code);
  }

  checkAccess(code:string){
    this.authService.userPermissions$.subscribe((p:string[]) => {
      const access = p.includes(code);
      this.viewContainer.clear();
      if(access){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    })
  }

  onDestroy(){
    //this.destroy$.unsubscribe();
  }

}
