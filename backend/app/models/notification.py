from .db import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='notifications')

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'created_date': self.created_date,
            'user_id': self.user_id,
        }