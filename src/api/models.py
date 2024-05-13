from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    lists = db.relationship('List', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False) 
    movies = db.relationship('Movie', backref='list', lazy=True) 
    series = db.relationship('Serie', backref='list', lazy=True) 

    def __repr__(self):
        return f'<List {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "movies": list(map(lambda x: x.serialize(), self.movies)),
            "series": list(map(lambda x: x.serialize(), self.series))
         }

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    genres = db.Column(db.ARRAY(db.String), nullable=True)
    title = db.Column(db.String(120), nullable=False)   
    overview = db.Column(db.String(120), nullable=False)
    poster_path = db.Column(db.String(120), nullable=False)
    release_date = db.Column(db.String(120), nullable=False)
    runtime = db.Column(db.Integer, nullable=False)
    tagline = db.Column(db.Integer, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)

    def __repr__(self):
        return f'<Movie {self.title}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "genres": self.genres,
            "title": self.title,
            "overview": self.overview,
            "poster_path": self.poster_path,
            "release_date": self.release_date,
            "runtime": self.runtime,
            "tagline": self.tagline
        }

class Serie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    genres = db.Column(db.ARRAY(db.String), nullable=True)
    name = db.Column(db.String(120), nullable=False)   
    overview = db.Column(db.String(120), nullable=False)
    poster_path = db.Column(db.String(120), nullable=False)
    first_air_date = db.Column(db.String(120), nullable=False)
    last_air_date = db.Column(db.String(120), nullable=False)
    number_of_episodes = db.Column(db.Integer, nullable=False)
    number_of_seasons = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(120), nullable=False)
    network = db.Column(db.ARRAY(db.String), nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)

    def __repr__(self):    
        return f'<Serie {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "genres": self.genres,
            "name": self.name,
            "overview": self.overview,
            "poster_path": self.poster_path,
            "first_air_date": self.first_air_date,
            "last_air_date": self.last_air_date,
            "number_of_episodes": self.number_of_episodes,
            "number_of_seasons": self.number_of_seasons,
            "status": self.status,
            "network": self.network
        }
