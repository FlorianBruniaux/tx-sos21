function (doc) {
    if (doc.type.match(/object$/gi)) {
        emit(doc.place, doc);
    }
}