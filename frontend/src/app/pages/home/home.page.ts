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

  async edit(item: Item) {
    const alert = await this.alertCtrl.create({
      header: 'Edit item',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: item.title
        },
        {
          name: 'description',
          placeholder: 'Description',
          value: item.description
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (newItem: Item) => { newItem._id = item._id; newItem._rev = item._rev; this.itemsService.update(newItem); }
        }
      ]
    });
    alert.present();
  }

  remove(item: Item) {
    this.itemsService.remove(item);
  }

}
