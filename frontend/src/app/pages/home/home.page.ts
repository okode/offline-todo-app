import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Item[] = [];

  constructor(
    private alertCtrl: AlertController,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.itemsService.changes().subscribe(() => { this.refresh(); });
    this.refresh();
  }

  private refresh() {
    this.itemsService.findAll().then(docs => { this.items = docs; });
  }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'New item',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (item: Item) => { this.itemsService.add(item); }
        }
      ]
    });
    alert.present();
  }

  edit(item: Item) {
    console.log('Edit not implemented');
  }

  remove(item: Item) {
    console.log('Delete not implemented');
  }

}
