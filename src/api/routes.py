"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, List, Movie, Serie
from sqlalchemy.orm import joinedload
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def handle_signup():
    request_body = request.get_json()
   
    email = request_body.get('email')
    password = request_body.get('password')
  
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    reponse_body = {
        'msg': 'User created successfully',
        'user': user.serialize()
    }


    return jsonify(reponse_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({'msg': 'Error en el email o password'}), 401
   
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


@api.route('/users/<int:id>/<int:listid>', methods=['POST']) #para añadir una lista a un usuario
def handle_newuser(id,listid):
    user = User.query.get(id)
    targetList = List.query.get(listid)
    user.lists.append(targetList)
    db.session.commit()
    return "Pleaseee!!"

@api.route('/users/<int:id>', methods=['GET'])  #para obtener todas las listas o lo que pollas tenga el usuario jejeje
def handle_get_one_user(id):
    user = User.query.options(joinedload(User.lists).joinedload(List.movies),joinedload(User.lists).joinedload(List.series)).get(id)
    
    response_body = {
        "id": user.id,
        "name": user.nombre,
        "email": user.email,
        "lists": [{
            "id": list.id,
            "name": list.name,
            "users": list.user_id,
            "movies": [{
                "id": movie.id
            } for movie in list.movies],
            "series": [{
                "id": serie.id
            } for serie in list.series]
        } for list in user.lists]
    }
    return jsonify(response_body), 200



@api.route('/users/<int:id>', methods=['DELETE'])
def handle_delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "msg": "The user was deleted "
    }
    return jsonify(response_body), 200



@api.route('/users/<int:id>', methods=['PUT'])
def handle_edit_user(id):
    email = request.json.get('email')
    password = request.json.get('password')
    nombre = request.json.get('nombre')
    user = User.query.get(id)
    user.email = email
    user.password = password
    user.nombre = nombre
    db.session.commit()
    response_body = {
        "msg": "The user was modified ",
        "user": user.serialize()

    }
    return jsonify(response_body), 200

## AHORA CREA LA LISTA ASOCIADA AL ID DEL USUARIO QUE HA GENERADO EL TOKEN CON EL JWT_IDENTITY

@api.route('/lists', methods=['POST'])
@jwt_required()
def handle_new_list():
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    if not current_user:
        return jsonify({'msg': 'User not found'}), 404

    request_body = request.get_json()
    name = request_body.get('name')

    new_list = List(name=name)
    new_list.owners.append(current_user)
    db.session.add(new_list)
    db.session.commit()

    response_body = {
        "msg": "List created successfully",
        "list": new_list.serialize()
    }
    return jsonify(response_body), 200

@api.route('/lists/<int:id>', methods=['PUT'])
def handle_edit_list(id):
    name = request.json.get('name')
    list = List.query.get(id)           #query para buscar el id (es consulta)
    list.name = name
    db.session.commit()
    response_body = {
        "msg": "The list was modified ",
        "list": list.serialize()

    }
    return jsonify(response_body), 200

@api.route('/lists/<int:id>', methods=['DELETE'])    #elimina la lista por completo
def handle_delete_list(id):
    list = List.query.get(id)
    db.session.delete(list)
    db.session.commit()
    response_body = {
        "msg": "The list was deleted "
    }
    return jsonify(response_body), 200


## ESTE SERIA EL ACTUALIZADO PARA COMPARTIR LAS LISTAS CON OTRO USUARIO A TRAVES DEL MAIL

@api.route('/lists/<int:list_id>/share', methods=['POST'])
@jwt_required()
def share_list(list_id):
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    if not current_user:
        return jsonify({'msg': 'User not found'}), 404

    list_to_share = List.query.get(list_id)
    if not list_to_share:
        return jsonify({'msg': 'List not found'}), 404

    request_body = request.get_json()
    recipient_email = request_body.get('email')

    recipient_user = User.query.filter_by(email=recipient_email).first()
    if not recipient_user:
        return jsonify({'msg': 'Recipient user not found'}), 404

    if recipient_user in list_to_share.owners:
        return jsonify({'msg': 'User already has access to this list'}), 400

    list_to_share.owners.append(recipient_user)
    db.session.commit()

    return jsonify({'msg': 'List shared successfully'}), 200

""" @api.route('/lists/<int:list_id>/add_user', methods=['POST'])
def add_user_to_list(list_id):
    user_id = request.json.get('user_id')
    list = List.query.get(list_id)
    user = User.query.get(user_id)

    if not list or not user:
        return jsonify({'msg': 'List or User not found'}), 404

    list.owners.append(user)
    db.session.commit()

    return jsonify({'msg': 'User added to list'}), 200 """

### ESTE DE ABAJO TE TRAE LA INFO DE LAS LISTAS CON LOS OWNERS

@api.route('/lists/<int:list_id>', methods=['GET'])
def get_list_details(list_id):
    list = List.query.get(list_id)

    if not list:
        return jsonify({'msg': 'List not found'}), 404

    return jsonify(list.serialize()), 200

@api.route('/lists/<int:list_id>', methods=['PUT'])
@jwt_required()
def edit_list(list_id):
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()
    list = List.query.get(list_id)

    if not list:
        return jsonify({'msg': 'List not found'}), 404

    if current_user not in list.owners:
        return jsonify({'msg': 'User not authorized to modify this list'}), 403

    name = request.json.get('name')
    list.name = name
    db.session.commit()

    return jsonify({'msg': 'List updated', 'list': list.serialize()}), 200







#####################

@api.route('/lists/<int:list_id>/add', methods=['PATCH']) #añadir una pelicula o serie a una lista
@jwt_required()
def add_movie_to_list(list_id):
    list = List.query.get(list_id)
    if not list:
        return jsonify({'msg': 'List not found'}), 404
    data = request.get_json()
    if 'movie' in data:
        movie_data = data['movie']
        new_movie = Movie(
            title=movie_data['title'],
            overview=movie_data['overview'],
            poster_path=movie_data['poster_path'],
            release_date=movie_data['release_date'],
            runtime=movie_data['runtime'],
            tagline=movie_data['tagline'],
            list_id=list_id
        )
        db.session.add(new_movie)
        db.session.commit()
        list.movies.append(new_movie)
        db.session.commit()
        return jsonify({'msg': 'Movie added to list', 'list': list.serialize()}), 200
    if 'serie' in data:
        serie_data = data['serie']
        new_serie = Serie(
            name=serie_data['name'],
            overview=serie_data['overview'],
            poster_path=serie_data['poster_path'],
            first_air_date=serie_data['first_air_date'],
            list_id=list_id
        )
        db.session.add(new_serie)
        db.session.commit()
        list.series.append(new_serie)
        db.session.commit()
        return jsonify({'msg': 'Serie added to list', 'list': list.serialize()}), 200
    return jsonify({'msg': 'No valid data provided'}), 400


###### prueba para eliminar pelis de la lista

@api.route('/lists/<int:list_id>/remove', methods=['DELETE'])
@jwt_required()
def remove_item_from_list(list_id):
    list = List.query.get(list_id)
    if not list:
        return jsonify({'msg': 'List not found'}), 404
    
    data = request.get_json()

    # Eliminar una película de la lista
    if 'movie_id' in data:
        movie_id = data['movie_id']
        movie = Movie.query.get(movie_id)
        if not movie or movie.list_id != list_id:
            return jsonify({'msg': 'Movie not found in the list'}), 404
        db.session.delete(movie)
        db.session.commit()
        return jsonify({'msg': 'Movie removed from list', 'list': list.serialize()}), 200

    # Eliminar una serie de la lista
    if 'serie_id' in data:
        serie_id = data['serie_id']
        serie = Serie.query.get(serie_id)
        if not serie or serie.list_id != list_id:
            return jsonify({'msg': 'Series not found in the list'}), 404
        db.session.delete(serie)
        db.session.commit()
        return jsonify({'msg': 'Series removed from list', 'list': list.serialize()}), 200

    return jsonify({'msg': 'No valid data provided'}), 400