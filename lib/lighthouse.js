'use babel';

import LighthouseView from './lighthouse-view';
import { CompositeDisposable } from 'atom';

export default {

  lighthouseView: null,
  leftPanel: null,
  //modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lighthouseView = new LighthouseView(state.lighthouseViewState);
    this.leftPanel = atom.workspace.addLeftPanel({
      item: this.lighthouseView.getElement(),
      visible: false
    })
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.lighthouseView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lighthouse:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.leftPanel.destroy();
    this.subscriptions.dispose();
    this.lighthouseView.destroy();
  },

  serialize() {
    return {
      lighthouseViewState: this.lighthouseView.serialize()
    };
  },

  toggle() {
    console.log('Lighthouse was toggled!');
    //this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show();

    this.leftPanel.isVisible() ? this.leftPanel.hide() : this.leftPanel.show();
  }

};
