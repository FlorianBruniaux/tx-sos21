function (doc) {
    if (doc.type.match(/_object$/)) {
        emit(doc.place, doc);
    }
}