from .db import db
from sqlalchemy.orm import relationship


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='notifications')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'message': self.message,
            'user_id': self.user_id,
        }
