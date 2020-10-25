import React from "react";

function Card(props) {
  const { onCardClick, onCardLike, onCardDelete, link, name, _id, likes, owner, userId } = props;

  function handleClick() {
    onCardClick(name, link);
  }

  function handleLikeClick() {
    onCardLike(_id, likes);
  }

  function handleDeleteClick() {
    onCardDelete(_id);
  }

  const isLiked = likes.some(i => i === userId);

  const isOwn = owner._id === userId;

  return (
    <article className="card">
      {isOwn && <button className="card__button-delete" type="button" onClick={handleDeleteClick} aria-label="Удалить"></button>}
      <img className="card__img" alt={name} src={link} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
          <div className="card__likes">
            <button className={`card__button-like ${isLiked && `card__button-like_active`}`} 
            type="button" aria-label="Нравится"
            onClick={handleLikeClick}></button>
            <div className="card__num-likes">{likes.length}</div>
          </div>
      </div>
    </article>
  );
}

export default Card;