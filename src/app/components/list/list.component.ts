import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfoList, InfoCard } from 'src/app/app.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() list: InfoList;
  @Input() lists: InfoList[];
  @Output() removeList = new EventEmitter();
  @Output() removeCard = new EventEmitter();

  constructor() {
    this.list = {
      title: '',
      id: 0,
      cards: [],
    };
    this.lists = [];
  }

  ngOnInit(): void {}

  deleteList(currentList: InfoList) {
    this.removeList.emit(currentList.id);
  }

  addCard(list: InfoList, title: string) {
    if (title.trim()) {
      const currentListId = list.id;
      const getAllCardsId: number[] = this.lists.reduce(
        (acc: number[], list: InfoList) => [
          ...acc,
          ...list.cards.map((card) => card.id),
        ],
        []
      );
      console.log('getAllCardsId', getAllCardsId);

      const newCardId = Math.max.apply(null, getAllCardsId) + 1;

      const newCard: InfoCard = {
        id: newCardId,
        title,
      };
      this.lists.map((list) => ({
        ...list,
        cards:
          currentListId === list.id ? list.cards.push(newCard) : list.cards,
      }));
      console.log('newCard', newCard);
      console.log('lists', this.lists);
    }
    console.log('title before', title);
    console.log('title after', title);
  }

  deleteCard(listCard: InfoCard) {
    this.removeCard.emit(listCard.id);
  }

  dropCard(event: CdkDragDrop<InfoCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
