import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import COUNT_UPDATED_CHANNEL from '@salesforce/messageChannel/Count_Updated__c';
export default class Counts extends LightningElement {
  subscription = null;
  priorCount = 0;
  counter = 0;
  @wire(MessageContext)
  messageContext;
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      COUNT_UPDATED_CHANNEL,
      (message) => this.handleMessage(message)
    );
    console.log('subscription to COUNT_UPDATED_CHANNEL finished');
  }
  handleMessage(message) {
    console.log('handle message in subscriber = ', message);
    this.priorCount = this.counter;
    if(message.operator == 'add') {
      this.counter += message.constant;
    }else if(message.operator == 'subtract') {
      this.counter -= message.constant;
    }else if(message.operator == 'devide') {
        this.counter /= message.constant;
    } else if(message.operator == 'multiply'){
      this.counter *= message.constant;
    }
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
  }
}