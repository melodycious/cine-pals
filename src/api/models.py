from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
user_list_association = db.Table('user_list_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('list_id', db.Integer, db.ForeignKey('list.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    id = db.Column(db.Integer, unique=True, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    lists = db.relationship('List', secondary=user_list_association, back_populates='owners', lazy=True)
    nombre = db.Column(db.String(120), nullable=True)


    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre
            # do not serialize the password, it's a security breach
        }

    

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120), nullable=False) 
    movies = db.relationship('Movie', backref='list', lazy=True) 
    series = db.relationship('Serie', backref='list', lazy=True)
    owners = db.relationship('User', secondary=user_list_association, back_populates='lists')

    def __repr__(self):
        return f'<List {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "owners": [user.serialize() for user in self.owners],
            "movies": [movie.serialize() for movie in self.movies],
            "series": [serie.serialize() for serie in self.series]
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
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=True)

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
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=True)

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