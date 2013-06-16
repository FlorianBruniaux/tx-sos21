function (doc) {
    if (doc.type.match(/Object$/)) {
        emit(doc.place, doc);
    }
}