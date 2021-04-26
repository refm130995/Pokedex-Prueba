import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private ngFirestore: AngularFirestore) {}

  refreshFavorites(list: number[]) {}

  getUsers() {
    this.ngFirestore
      .collection("users")
      .get()
      .forEach((snapshot) => {});
  }

  registerUser(userData) {
    try {
      this.ngFirestore.collection("users").doc(userData.uid).set(userData);
    } catch (err) {}
  }

  async updateFavoritesList(favoriteIds: any[]) {
    const userData = await localStorage.getItem("user");

    const user = userData ? JSON.parse(userData) : null;

    if (user) {
      this.ngFirestore
        .collection("users")
        .doc(user.uid ? user.uid : user.user.uid)
        .set({
          favoriteIds,
        });
    }
  }

  async getFavoritesList() {
    const userData = await localStorage.getItem("user");

    const user = userData ? JSON.parse(userData) : null;

    if (user) {
      return this.ngFirestore
        .collection("users")
        .doc(user.uid ? user.uid : user.user.uid)
        .get()
        .toPromise();
    }
    return false;
  }
}
