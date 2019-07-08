import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  app: object;
  device: object;

  constructor(
    private alertController: AlertController,
    private lc: LoadingController
  ) { }

  error(error: Error | object) {
    // If undefined object
    const data = { };
    data['code'] = error['code'] ? error['code'] : '666';
    data['message'] = error['message'] ? error['message'] : error;
    // Create alert
    this.alertController.create({
      header: 'Error',
      subHeader: data['code'],
      message: data['message'],
      buttons: [{
        text: 'Send Error Report',
        handler: () => {}// TODO: Send email as handler
        // this.sendEmail('k173673@nu.edu.pk',
        // 'Bug Report (FAST CarPool)',
        // `Device:\n${JSON.stringify(this.device)}\nApp:\n${JSON.stringify(this.app)}\nCode: ${data['code']}\nMessage: ${data['message']}`)
      }, 'Okay']
    }).then(alert => {
      alert.present();
    });
  }

  // sendEmail(to: string, subject: string, body: string) {
  //   this.emailComposer.isAvailable().then((available) => {
  //     if (available) {
  //       // Now we know we can send
  //       const email = {
  //         to: to,
  //         subject: subject,
  //         body: body
  //       };
  //       // Send a text message using default options
  //       this.emailComposer.open(email);
  //     } else throw new Error('Email Composer not available');
  //   }).catch(err => {
  //     this.notice(err);
  //   });
  // }

  // Takes a message as the first argument and displays it for confirmation
  // The second arguments is a confirmation handler which is triggered if the user presses yes
  async confirmation(message: string, confirmationHandler: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message,
      buttons: [
        {
          text: 'Yes',
          handler: confirmationHandler
        }, 'No' // No Action
      ]
    });

    await alert.present();
  }

  async notice(message: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message,
      buttons: ['Okay']
    });

    await alert.present();
  }

  load(message: string, work: Promise<any>) {
    // If taking too long (3 seconds), just resolve
    let wait: any; // NodeJS.Timeout;
    const timeout = new Promise(resolve => {
      wait = setTimeout(() => {
        console.log('Timeout');
        return resolve();
      }, 3000);
    });

    // Promise to detect when done
    return new Promise((resolve, reject) => {
      const loading = this.lc.create({
        message
      });
      loading.then(loader => {
        loader.present()
        .then(() => {
          Promise.race([work, timeout])
          .then(() => {
            clearTimeout(wait);
            this.lc.dismiss(null, null, loader.id);
            loader = null;
            return resolve();
          }).catch(err => {
            clearTimeout(wait);
            this.lc.dismiss(null, null, loader.id);
            loader = null;
            return reject(err);
          });
        });
      });
    });
  }
}
