import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface InfoList {
  title: string;
  id: number;
  cards: InfoCard[];
}

export interface InfoCard {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // @ViewChild('cardTitle') input;

  ngOnInit(): void {}

  lists: InfoList[] = [
    {
      title: 'TODO',
      id: 1,
      cards: [
        {
          id: 1,
          title: 'Text 1',
        },
        {
          id: 7,
          title: 'Text 7',
        },
        {
          id: 8,
          title: 'Text 8',
        },
      ],
    },
    {
      title: 'ACTIVE',
      id: 2,
      cards: [
        {
          id: 2,
          title: 'Text 2',
        },
        {
          id: 6,
          title: 'Text 6',
        },
        {
          id: 9,
          title: 'Text 9',
        },
      ],
    },
    {
      title: 'DONE',
      id: 3,
      cards: [
        {
          id: 3,
          title: 'Text 3',
        },
        {
          id: 4,
          title: 'Text 4',
        },
        {
          id: 5,
          title: 'Text 5',
        },
      ],
    },
  ];

  addList(title: string) {
    if (title.trim()) {
      const newListId =
        Math.max.apply(
          null,
          this.lists.map((list) => list.id)
        ) + 1;
      const newList: InfoList = {
        title,
        id: newListId,
        cards: [],
      };
      this.lists.push(newList);
      console.log('New Title List', newList);
    }
    console.log('arr lists', this.lists);
  }

  deleteList(currentList: InfoList) {
    this.lists = this.lists.filter((list) => list.id !== currentList.id);
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
    this.lists = this.lists.map((list) => ({
      ...list,
      cards: list.cards.filter((card) => card.id !== listCard.id),
    }));
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
  // dropList(event: CdkDragDrop<InfoList[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }
}
