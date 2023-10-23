from .db import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)

    recipient = relationship('User', foreign_keys=[recipient_id])
    user = relationship('User', foreign_keys=[user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'created_date': self.created_date,
            'recipient_id': self.recipient_id,
            'user_id': self.user_id,
        }
