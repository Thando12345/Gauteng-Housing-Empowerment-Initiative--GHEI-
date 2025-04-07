from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Property, RentalAgreement, Resource, ForumPost, SupportTicket
from rest_framework import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['property_id', 'landlord', 'address', 'city', 'province', 'description', 'rental_price', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'landlord']

class RentalAgreementSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalAgreement
        fields = ['agreement_id', 'property', 'tenant', 'start_date', 'end_date', 'terms_and_conditions', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['resource_id', 'title', 'type', 'url', 'language', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class ForumPostSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost
        fields = ['post_id', 'user', 'title', 'content', 'parent_post', 'replies', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'user']

    def get_replies(self, obj):
        replies = ForumPost.objects.filter(parent_post=obj)
        return ForumPostSerializer(replies, many=True).data

class SupportTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = ['ticket_id', 'user', 'title', 'description', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'user']

# Custom permissions
class IsLandlordOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['landlord', 'administrator']

class IsTenantOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['tenant', 'administrator']

class IsAdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'administrator'

# ViewSets
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdminOnly()]

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsLandlordOrAdmin()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)

class RentalAgreementViewSet(viewsets.ModelViewSet):
    queryset = RentalAgreement.objects.all()
    serializer_class = RentalAgreementSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'landlord':
            return RentalAgreement.objects.filter(property__landlord=user)
        elif user.role == 'tenant':
            return RentalAgreement.objects.filter(tenant=user)
        return RentalAgreement.objects.all()

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminOnly()]
        return [permissions.IsAuthenticated()]

class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'administrator':
            return SupportTicket.objects.all()
        return SupportTicket.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)